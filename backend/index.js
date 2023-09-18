import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

// Use the cors middleware to enable CORS
app.use(cors());

app.get('/', async (req, res) => {
    try {
        const url = 'https://api.madgrades.com/v1/courses/e449f054-a344-3556-b18a-5333e51ceb82/grades';
        const token = 'e468f2c9c97747a3912989978d211f2a';

        const response = await axios.get(url, {
            headers: {
                'Authorization': `Token token=${token}`
            },
        });

        if (response.status === 200) {
            const data = response.data;
            const aCountPerTerm = [];
            const totalPeoplePerTerm = [];
            // Iterate through the courseOfferings for each term
            data.courseOfferings.forEach((term) => {
                // Extract the "aCount" value for the term
                const aCount = term.cumulative.aCount;
                const total = term.cumulative.total;
                // Push the "aCount" value to the array
                aCountPerTerm.push(aCount);
                totalPeoplePerTerm.push(total);
            });
            
            // Now, aCountPerTerm contains an array of "aCount" values per term
            res.json({
                "aCountPerTerm": aCountPerTerm,
                "totalPeoplePerTerm": totalPeoplePerTerm
            });
        } else {
            throw new Error('Request failed');
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server listening on port ${port} 🚀`));

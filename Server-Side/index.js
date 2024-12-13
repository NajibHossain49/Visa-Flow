require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Designed with love 💖 by Najib Hossain");
});

// MongoDB URI and client
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.SECRET_KEY}@cluster0.tqv0m.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    // Endpoint to fetch the latest 6 visas
    app.get("/latestVisas", async (req, res) => {
      const collection = client.db("visaDatabase").collection("visas");

      // Fetch the latest 6 visas (sort by _id descending to get the latest)
      const visas = await collection
        .find()
        .sort({ _id: -1 })
        .limit(6)
        .toArray();

      // Send the visas as a JSON response
      res.send(visas);
    });

    // POST route to Insert visa data
    app.post("/visas", async (req, res) => {
      const visaData = req.body;
      const collection = client.db("visaDatabase").collection("visas");
      const result = await collection.insertOne(visaData);
      res.send("Visa added successfully!");
    });

    // GET route to Fetch all-visas data
    app.get("/visas", async (req, res) => {
      const database = client.db("visaDatabase");
      const visasCollection = database.collection("visas");
      const visas = await visasCollection.find({}).toArray();
      res.send(visas);
    });

    // GET route to Fetch Single Visa Details
    app.get("/visas/:id", async (req, res) => {
      const visaId = req.params.id;
      try {
        const visa = await client
          .db("visaDatabase")
          .collection("visas")
          .findOne({ _id: new ObjectId(visaId) });

        if (visa) {
          res.json(visa);
        } else {
          res.status(404).send({ message: "Visa not found" });
        }
      } catch (error) {
        console.error("Error fetching visa:", error);
        res.status(500).send({ message: "Server error" });
      }
    });

    // POST endpoint for storing visa applications
    app.post("/visa-applications", async (req, res) => {
      const applicationData = req.body;
      const result = await client
        .db("visaDatabase")
        .collection("visaApplications")
        .insertOne(applicationData);
      res.send(result);
    });

    // Get endpoint My Added Visas , Getting data by users specific email
    app.get("/my-added-visas", async (req, res) => {
      const { email } = req.query;
      console.log("Received email query:", email);
      try {
        const visas = await client
          .db("visaDatabase")
          .collection("visas")
          .find({ email: email })
          .toArray();
        console.log("Query result:", visas);
        res.send(visas);
      } catch (error) {
        console.error("Error querying database:", error);
        res.status(500).send({ error: "Database query failed" });
      }
    });

    // Delete My Added Visas
    app.delete("/visa/:id", async (req, res) => {
      const { id } = req.params;
      try {
        const result = await client
          .db("visaDatabase")
          .collection("visas")
          .deleteOne({ _id: new ObjectId(id) });
        res.send({ success: true });
      } catch (error) {
        res.status(500).send({ error: "Failed to delete visa" });
      }
    });

    app.put("/visa/:id", async (req, res) => {
      const { id } = req.params;
      console.log(id);
      const updatedVisa = req.body;
      // Map 'countryImageUrl' to 'countryImage' if it exists
      if (updatedVisa.countryImageUrl) {
        updatedVisa.countryImage = updatedVisa.countryImageUrl;
        delete updatedVisa.countryImageUrl;
      }
      delete updatedVisa._id;
      console.log(updatedVisa);

      const result = await client
        .db("visaDatabase")
        .collection("visas")
        .findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: updatedVisa },
          { returnDocument: "after" }
        );
      return res.send(result);
    });

    // GET: Fetch all visa applications
    app.get("/visaApplications", async (req, res) => {
      const { email } = req.query;

      if (!email) {
        return res
          .status(400)
          .send({ error: "Email query parameter is required" });
      }

      try {
        const visaApplications = await client
          .db("visaDatabase")
          .collection("visaApplications")
          .find({ applicantEmail: email })
          .toArray();

        if (visaApplications.length > 0) {
          res.status(200).json(visaApplications);
        } else {
          res
            .status(404)
            .send({ message: "No visa applications found for this email" });
        }
      } catch (error) {
        console.error("Error fetching visa applications:", error);
        res.status(500).send({ error: "Failed to fetch visa applications" });
      }
    });

    // DELETE: Remove a visa application
    app.delete("/visaApplications", async (req, res) => {
      const { email } = req.query;

      if (!email) {
        return res
          .status(400)
          .send({ error: "Email query parameter is required" });
      }

      try {
        const result = await client
          .db("visaDatabase")
          .collection("visaApplications")
          .deleteMany({ applicantEmail: email });

        if (result.deletedCount > 0) {
          res.status(200).json({
            message: `${result.deletedCount} visa application(s) deleted successfully`,
          });
        } else {
          res
            .status(404)
            .send({ message: "No visa applications found for this email" });
        }
      } catch (error) {
        console.error("Error deleting visa applications:", error);
        res.status(500).send({ error: "Failed to delete visa applications" });
      }
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

run().catch(console.dir);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

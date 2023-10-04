import {
  connectDatabase,
  insertDocument,
  getAllDocuments,
} from "@/helpers/db-util";

// import { MongoClient } from "mongodb";

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;

  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to database failed!" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    const newComment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
    } catch (error) {
      res.status(500).json({ message: "Inserting comment failed!" });
      return;
    }

    console.log("Api/Comments/[eventId].js new comment: ", result);

    newComment._id = result.insertedId;

    res
      .status(201)
      .json({ message: "Added comment successfully!", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();

    const docs = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 })
      .toArray();

    res.status(200).json({ comments: docs });
  }

  client.close();
}

// const eventId = req.query.eventId;
// let client;

// try {
//   // Establish a database connection
//   client = await connectDatabase();
// } catch (error) {
//   res.status(500).json({ message: "Connecting to the database failed" });
//   return;
// }

// try {
//   if (req.method === "POST") {
//     const { email, name, text } = req.body;

//     if (
//       !email.includes("@") ||
//       !name ||
//       name.trim() === "" ||
//       !text ||
//       text.trim() === ""
//     ) {
//       res.status(422).json({ message: "Invalid input." });
//       client.close();
//       return;
//     }

//     const newComment = {
//       id: new Date().toISOString(),
//       email,
//       name,
//       text,
//       eventId,
//     };

//     console.log("Api Comments [eventId].js - new comment: ", newComment)

//     const result = await insertDocument(client, "comments", newComment);
//     newComment._id = result.insertedId;

//     res.status(201).json({ message: "Added comment.", comment: newComment });
//   }

//   if (req.method === "GET") {
//     const documents = await getAllDocuments(client, "comments", { _id: -1 });
//     res.status(200).json({ comments: documents });
//   }
//   } catch (error) {
//     res.status(500).json({ message: "Server Error: " + error.message });
//   } finally {
//     client.close();
// }
// }

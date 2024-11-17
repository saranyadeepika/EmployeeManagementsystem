import mongoose from "mongoose";

export async function connecting() {
  try {
    // Connect to the MongoDB database
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const connection = mongoose.connection;

    // Listen for the 'connected' event
    connection.on('connected', () => {
      console.log("Connected to MongoDB successfully.");
    });

    // Listen for the 'error' event
    connection.on('error', (err) => {
      console.error("MongoDB connection error:", err);
    });
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

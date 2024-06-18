const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {

      orderId: { 
          type: String,
          required: true
      },
      paymentId: { 
          type: String 
      },
      amount: { 
          type: Number,
          required: true 
      },
      status: {
          type: String,
          enum: ["completed", "pending", "cancelled"],
          default: "pending",
      },
      clientName: { 
          type: String,
          required: true 
        },
      clientId: { 
          type: String,
          required: true 
        },
      therapistId: { 
          type: String,
          required: true 
      },
      therapistName: { 
          type: String, 
          required: true 
      },
      createdAt: { 
          type: Date,
          default: Date.now 
      },
  });

module.exports = mongoose.model("Payment", paymentSchema);

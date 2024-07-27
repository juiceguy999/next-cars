import { Schema, model, models } from "mongoose";

const CarSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  },
  fuel: {
    type: String,
    required: true
  },
  transmission: {
    type: String,
    required: true
  },
  drive: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true
  },
  seats: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  power: {
    type: Number,
    required: true
  },
  mileage: {
    type: Number,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  rent: {
    type: Boolean,
    default: false
  },
  address: {
    type: Boolean,
    default: false
  },
  published: {
    type: Boolean,
    default: false
  },
  rates: {
    daily: {
      type: Number
    },
    weekly: {
      type: Number
    },
    monthly: {
      type: Number
    }
  },
  location: {
    street: {
      type: String
    },
    city: {
      type: String
    },
    state: {
      type: String
    },
    zipcode: {
      type: String
    }
  },
  seller: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    phone: {
      type: String
    }
  },
  features: [
    {
      type: String
    }
  ],
  images: [
    {
      type: String
    }
  ]
}, {
  timestamps: true
});

const Car = models.Car || model('Car', CarSchema);

export default Car;
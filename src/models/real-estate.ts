import mongoose from "mongoose";

const realEstateSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    transactionType: { type: String, required: true, enum: ['sale', 'daily rental', 'monthly', 'seasonal'] },
    price: { type: Number, required: true, min: 0 },
    availability: { type: Boolean, default: true },

    location: {
        address: { type: String, required: true },
        coordinates: {
            latitude: {
                type: Number,
                required: true,
                min: -90,
                max: 90
            },
            longitude: {
                type: Number,
                required: true,
                min: -180,
                max: 180
            }
        },
    },

    characteristics: {
        totalSurface: { type: Number, required: true, min: 0 },
        roomDimensions: [{ roomName: String, length: Number, width: Number, surface: Number }],
        numberOfBedRooms: { type: Number, required: true, min: 0 },
        numberOfBathrooms: { type: Number, required: true, min: 0 },
        equipment: {
            wifi: { type: Boolean, default: false },
            airConditioning: { type: Boolean, default: false },
            parking: { type: Boolean, default: false },
            heating: { type: Boolean, default: false },
            balcony: { type: Boolean, default: false },
            garden: { type: Boolean, default: false },
            pool: { type: Boolean, default: false },
            elevator: { type: Boolean, default: false },
        },
        internalRules: {
            animalsAllowed: { type: Boolean, default: false },
            smokingAllowed: { type: Boolean, default: false },
            partiesAllowed: { type: Boolean, default: false }
        },
        energyDiagnostics: { type: String }
    },
    // timestamp: true
});

realEstateSchema.index({ 'location.coordinates.latitude': 1, 'location.coordinates.longitude': 1 });
realEstateSchema.index({ transactionType: 1, price: 1 });
realEstateSchema.index({ availability: 1 });

const RealEstate = mongoose.model('RealEstate', realEstateSchema);

export default RealEstate;
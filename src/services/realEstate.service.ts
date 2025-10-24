import { ObjectId } from "mongoose";
import RealEstate from "../models/real-estate";

class RealEstateServices {

    private static async checkRealEstateExists(id: ObjectId): Promise<any> {
        const realEstate: object | null = await RealEstate.findById(id);
        if (!realEstate) {
            throw new Error("Cannot find the real-estate");
        }
        return realEstate;
    }

    static async getAllRealEstates(page: number = 1, limit: number = 10): Promise<any> {
        const offset: number = (page - 1) * limit;
        const totalCount: number = await RealEstate.countDocuments();

        const allRealEstates: object = await RealEstate.find()
            .skip(offset)
            .limit(limit)
            .sort({ createdAt: -1 });

        if (!allRealEstates) {
            throw new Error("No real estates found");
        }

        // Calculate pagination metadata
        const totalPages: number = Math.ceil(totalCount / limit);
        const hasNextPage: boolean = page < totalPages;
        const hasPrevPage: boolean = page > 1;

        return {
            data: allRealEstates,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalCount: totalCount,
                limit: limit,
                hasNextPage: hasNextPage,
                hasPrevPage: hasPrevPage
            }
        };
    }

    static async showRealEstate(id: ObjectId): Promise<any> {
        const realEstate: object | null = await this.checkRealEstateExists(id);
        return realEstate;
    }

    static async createRealEstate(data: any): Promise<any> {
        const duplicate: object | null = await RealEstate.exists({
            'location.address': data.location?.address,
            'location.coordinates.latitude': data.location?.coordinates?.latitude,
            'location.coordinates.longitude': data.location?.coordinates?.longitude,
        });
        if (duplicate) {
            throw new Error('A real-estate with the same title and address/coordinates already exists');
        }

        const newRealEstate: object = await RealEstate.create(data);
        return newRealEstate;
    }

    static async updateRealEstate(id: ObjectId, data: any): Promise<any> {
        await this.checkRealEstateExists(id);
        const updatedRealEstate: object | null = await RealEstate.findByIdAndUpdate(
            id,
            data,
            { new: true }
        );
        return updatedRealEstate;
    }

    static async deleteRealEstate(id: ObjectId): Promise<any> {
        await this.checkRealEstateExists(id);
        const realEstate: object | null = await RealEstate.findByIdAndDelete(id);
        return { message: "Real-estate deleted successfully", deletedRealEstate: realEstate };
    }

    static async searchRealEstate(filters: any): Promise<any[]> {
        const query: any = {};

        // Price range filter
        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = filters.minPrice;
            if (filters.maxPrice) query.price.$lte = filters.maxPrice;
        }

        // Property type filter
        if (filters.type) {
            query.type = filters.type;
        }

        // Location filter (city, address, etc.)
        if (filters.location) {
            query['location.address'] = { $regex: filters.location, $options: 'i' };
        }

        // Bedrooms filter
        if (filters.bedrooms) {
            query.bedrooms = { $gte: filters.bedrooms };
        }

        // Bathrooms filter
        if (filters.bathrooms) {
            query.bathrooms = { $gte: filters.bathrooms };
        }

        // Area/Size filter
        if (filters.minArea || filters.maxArea) {
            query.area = {};
            if (filters.minArea) query.area.$gte = filters.minArea;
            if (filters.maxArea) query.area.$lte = filters.maxArea;
        }

        // Availability filter
        if (filters.isAvailable !== undefined) {
            query.isAvailable = filters.isAvailable;
        }

        // Status filter (for sale, for rent, etc.)
        if (filters.status) {
            query.status = filters.status;
        }

        const results: any = await RealEstate.find(query)
            .sort({ createdAt: -1 })
            .limit(filters.limit || 50);

        return results;
    }

    static async updateAvailability(id: ObjectId, availability: boolean): Promise<any> {
        await this.checkRealEstateExists(id);
        const updatedRealEstate: object | null = await RealEstate.findByIdAndUpdate(
            id,
            { availability: availability },
            { new: true }
        );
        return updatedRealEstate;
    }

}

export default RealEstateServices;
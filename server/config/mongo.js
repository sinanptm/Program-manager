import { connect } from 'mongoose';

export const connectDB = async () => {
    try {
        await connect(process.env.MONGO_URL, {
            dbName: 'Sahithyolsav'
        });
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
}

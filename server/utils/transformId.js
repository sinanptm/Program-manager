export const transformId = (doc) => {
    if (Array.isArray(doc)) {
        return doc.map(item => transformId(item));
    } else if (doc && typeof doc === 'object') {
        const { _id, ...rest } = doc.toObject ? doc.toObject() : doc;
        return { id: _id, ...rest };
    } else {
        return doc;
    }
};
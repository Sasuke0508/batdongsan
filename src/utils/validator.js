const validator = {
    validate: function(data, rules) {
        if (!data) {
            throw new Error('Data object is required');
        }
        const _this = this;
        Object.keys(data).forEach(key => {
            const k = rules.find(field => field.name === key);
            k?.rules?.forEach(r => {
                if (r.customFunc && r.customFunc(data)) {
                    throw new Error(r.message);
                }
                if (r.name && !_this[r.name](data[key], ...(r.param ?? []))) {
                    throw new Error(r.message);
                }
            })
        });
    },
    notNull: function(value) {
        return !!value;
    },
    size: function(value, min, max) {
        return this.min(value, min) && this.max(value, max);
    },
    length: function(value, min, max) {
        return this.size(value.length, min, max);
    },
    minLength: function(value, min) {
        return this.min(value.length, min);
    },
    maxLength: function(value, max) {
        return this.max(value.length, max);  
    },
    listSize: function(value, min, max) {
        return this.size(value.length, min, max);
    },
    min: function(value, min) {
        return value >= min;
    },
    max: function(value, max) {
        return value <= max;
    }
}

export default validator;
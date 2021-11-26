module.exports = (mongoose, mongoosePaginate) => {
    var schema = mongoose.Schema(
      {
        name: String,
        numList: [String]
      },
      { timestamps: true }
    );
  
    schema.method("toJSON", function() {
      const { __v, _id, ...object } = this.toObject();
      object.id = _id;
      return object;
    });
    
    schema.plugin(mongoosePaginate);
    
    const NumList = mongoose.model("numList", schema);
    return NumList;
  };
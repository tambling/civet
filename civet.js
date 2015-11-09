function Civet(){
  this.data = {};
  this.id = 1;
};

Civet.prototype.create = function(entity, callback){
  var error = null;

  if((entity instanceof Object) && !Array.isArray(entity)) {
    entity.id = this.id;
    this.data[entity.id] = Object.create({}, entity);
    this.id += 1; 
  } else {
    error = "You need to pass in an object!";
  }

  callback(error);
}

Civet.prototype.find = function(callback){
  var error = null;
  
  if(Object.keys(this.data).length === 0){
    error = "No records found!";
  }

  var entities = [];
  for (entity in this.data) {
    if(this.data.hasOwnProperty(entity)){
      entities.push(this.data[entity])
    }
  }
  callback(error, entities);
}

Civet.prototype.findById = function(id, callback) {
  var entity = this.data[id];
  var error = entity ? null : "No record found!";

  callback(error, entity);
}

Civet.prototype.remove = function(id, callback){
  var entity = Object.create({}, this.data[id]);
  var error = null;

  if(entity){
    delete this.data[id]
  } else {
    error = "No record found!";
  }

  callback(error, entity);
}

module.exports = new Civet();

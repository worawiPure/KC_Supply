var Q = require('q');

module.exports = {
  getList: function(db){
      var q = Q.defer();
      db('tb_department')
          .select('id','depname','depcode')
          .orderBy('depcode','ASC')
          .then(function (rows){
              q.resolve(rows);
          })
          .catch(function(err){
              q.reject(err);
          }) ;
          return q.promise;
  },
  getList_Department: function(db,depcode){
      var q = Q.defer();
      db('department')
          .select('id','depname','depcode')
          .where('depcode',depcode)
          .then(function (rows){
              q.resolve(rows);
          })
          .catch(function(err){
              q.reject(err);
          }) ;
          return q.promise;
  },

  getSubList: function(db){
      var q = Q.defer();
      db('department')
            .select('depcode')
            .orderBy('depcode','ASC')
            .then(function (rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            }) ;
        return q.promise;
    },

  save_department: function(db,depname,depcode){
      var q = Q.defer();
      db('department')
            .insert({depname:depname,depcode:depcode})
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function(db){
                q.reject(err);
            });
      return q.promise;
},

  remove_department: function(db,id){
        var q = Q.defer();
        db('department')
            .delete()
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    update_department: function(db,id,depname,depcode){
        var q = Q.defer();
        db('department')
            .update({depname:depname,depcode:depcode})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    }
};
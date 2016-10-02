var Q = require('q');

module.exports = {

    getList: function(db){
        var q = Q.defer();
        db('tb_user')
            .select()
            .then(function (rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            }) ;
        return q.promise;
    },

    getPname: function(db){
        var q = Q.defer();
        db('tb_prefix')
            .select()
            .then(function (rows){
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            }) ;
        return q.promise;
    },

    save_user: function(db,username,password,level_user_id,pname,fname,lname,depcode){
        var q = Q.defer();
        db('user_opd')
            .insert({user:username,password:password,level_user_id:level_user_id,pname:pname,fname:fname,lname:lname,depcode:depcode})
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    save_user2: function(db,data){
        var q = Q.defer();
        db('tb_user')
            .insert({pname:data.pname,name:data.fname,surname:data.lname,username:data.username,pw:data.pw,
                    pwfix:data.password,depcode:data.department,level_user:data.level_user})
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    save_user3: function(db,data){
        var q = Q.defer();
        db('tb_user')
            .update({pname:data.prefixnamel,name:data.name,surname:data.surname,depcode:data.depcode})
            .where('id',data.id)
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    save_user4: function(db,id,username,encryptPass,password){
        var q = Q.defer();
        db('tb_user')
            .update({username:username,pw:encryptPass,pwfix:password})
            .where('id',id)
            .then(function (rows) {
                q.resolve(rows);
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    remove_user: function(db,id){
        var q = Q.defer();
        db('tb_user')
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

    update_user: function(db,id,pname,fname,lname,username,encryptPass,password,depcode,level_user_id){
       var q = Q.defer();
        db('tb_user')
            .update({pname:pname,name:fname,surname:lname,username:username,pw:encryptPass,pwfix:password,depcode:depcode,level_user:level_user_id})
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    post_update_user: function(db,id){
        var q = Q.defer();
        db('tb_user')
            .update({comfirm: 'Y' })
            .where('id',id)
            .then(function(){
                q.resolve();
            })
            .catch(function(err){
                q.reject(err);
            });
        return q.promise;
    },

    getSubAll: function(db,startpage){
        var q = Q.defer();
        var sql =   'SELECT u.*,concat(p.prefixnamel,u.name," ",u.surname) as Nameuser,l.statususer,l.statusname,d.depname,p.prefixnamel FROM tb_user u '+
                    'LEFT JOIN tb_user_level l ON l.statususer=u.level_user '+
                    'LEFT JOIN tb_department d ON d.depcode=u.depcode '+
                    'JOIN tb_prefix p ON p.id=u.pname   '+
                    'where u.comfirm = "Y" '+
                    'order by u.level_user desc '+
                    'Limit 5 offset ? ';
        db.raw(sql,[startpage])
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getSubAll_total: function(db){
        var q = Q.defer();
        var sql =   'SELECT count(*) as total FROM tb_user u '+
        'where u.comfirm = "Y" '+
        'order by u.level_user desc'    ;
        db.raw(sql)
            .then(function(rows){
                console.log(rows[0][0].total);
                q.resolve(rows[0][0].total)
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    get_comfirm_user: function(db){
        var q = Q.defer();
        var sql =   'SELECT u.*,concat(p.prefixnamel,u.name," ",u.surname) as Nameuser,l.statususer,l.statusname,d.depname,p.prefixnamel FROM tb_user u '+
            'LEFT JOIN tb_user_level l ON l.statususer=u.level_user '+
            'LEFT JOIN tb_department d ON d.depcode=u.depcode '+
            'JOIN tb_prefix p ON p.id=u.pname   '+
            'where u.comfirm <> "Y" '+
            'order by u.level_user desc ';
        db.raw(sql)
            .then(function(rows){
                console.log(rows[0]);
                q.resolve(rows[0])
            })
            .catch(function(err){
                console.log(err)
                q.reject(err)
            });
        return q.promise;
    },

    getUser_edit: function(db,data){
            var q = Q.defer();
            var sql =   'SELECT u.username,u.pname,u.name,u.surname,u.id,p.prefixnamel,d.depname,u.depcode FROM tb_user u '+
                        'LEFT JOIN tb_prefix p ON p.id=u.pname  '+
                        'LEFT JOIN tb_department d ON d.depcode=u.depcode '+
                        'WHERE u.username = ? ';
            db.raw(sql,[data.username])
                .then(function(rows){
                    console.log(rows[0]);
                    q.resolve(rows[0])
                })
                .catch(function(err){
                    console.log(err)
                    q.reject(err)
                });
            return q.promise;
        },

    getUser_show: function(db,username){
            var q = Q.defer();
            var sql =   'SELECT CONCAT(p.`name`,u.fname," ",u.lname) as Uname,th_level FROM opd_user u '+
                        'LEFT OUTER JOIN pname p ON p.id=u.pname  '+
                        'LEFT OUTER JOIN opd_leveluser l ON u.level_user_id=l.id '+
                        'where u.user = ? ';
            db.raw(sql,[username])
                .then(function(rows){
                    console.log(rows[0]);
                    q.resolve(rows[0])
                })
                .catch(function(err){
                    console.log(err)
                    q.reject(err)
                });
            return q.promise;
        }
};
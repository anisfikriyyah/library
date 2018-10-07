const restify = require('restify')
// var morgan = require('morgan')
var winston = require('./config/winston')

const DatabaseConnection = require ('./model/db')
DatabaseConnection.connect((err, db) => {
    if(err != null){
        console.log(err)
        process.exit()
    } else {
        console.log('[DATABASE] connected')

        const server = restify.createServer()
        const port = process.env.PORT || 5000

        const corsMiddleware = require('restify-cors-middleware');
        const cors = corsMiddleware({
            origins: ['*'],
            allowHeaders:['Authorization']
        });
        const AuthMiddleware = require('./middlewares/authmiddleware')
        server.pre(cors.preflight);
        server.use(cors.actual);
        // server.use(morgan('combined', { stream: winston.stream }));

        const AuthBisnisLogic = require('./bisnislogic/AuthBisnisLogic')
        const BukuBisnisLogic = require('./bisnislogic/buku_BisnisLogic')
        const MenuBisnisLogic = require('./bisnislogic/menu_BIsnisLogic')
        const PenerbitBisnisLogic = require('./bisnislogic/penerbit_BisnisLogic')
        const PengarangBisnisLogic = require('./bisnislogic/pengarang_BisnisLogic')
        const AgamaBisnisLogic = require('./bisnislogic/agama_BisnisLogic')
        const TypeBisnisLogic = require('./bisnislogic/type_BisnisLogic')
        // const server = require('index.html')
        // server.get('/',restify.plugins.serveStatic({
        //     directory: __dirname,
        //     default:'index.html'
        // }))

        //use
        server.use(restify.plugins.queryParser())
        server.use(restify.plugins.bodyParser({ mapParams: false }))

        //post
        server.post('/api/auth/login',AuthBisnisLogic.loginHandler)
        server.post('/api/buku', BukuBisnisLogic.InsertBukuHandler)
        server.post('/api/menu', MenuBisnisLogic.InsertMenuHandler)
        server.post('/api/penerbit', PenerbitBisnisLogic.InsertPenerbitHandler)
        server.post('/api/agama', AgamaBisnisLogic.InsertAgamaHandler)
        server.post('/api/pengarang', PengarangBisnisLogic.InsertPengarangHandler)
        server.post('/api/type', TypeBisnisLogic.InsertTypeHandler)

        //get
        server.get('/api/buku',BukuBisnisLogic.readbukuAllHandler)
        server.get('/api/menu',MenuBisnisLogic.readMenuAllHandler)
        server.get('/api/penerbit',PenerbitBisnisLogic.readPenerbitAllHandler)
        server.get('/api/agama',AgamaBisnisLogic.readAgamaAllHandler)
        server.get('/api/pengarang',PengarangBisnisLogic.readPengarangAllHandler)
        server.get('/api/type',TypeBisnisLogic.readTypeAllHandler)

        //put
        server.put('/api/buku',BukuBisnisLogic.UpdateBukuHandler)
        server.put('/api/menu',MenuBisnisLogic.UpdateMenuHandler)
        server.put('/api/penerbit',PenerbitBisnisLogic.UpdatePenerbitHandler)
        server.put('/api/agama',AgamaBisnisLogic.UpdateAgamaHandler)
        server.put('/api/pengarang',PengarangBisnisLogic.UpdatePengarangHandler)
        server.put('/api/type',TypeBisnisLogic.UpdateTypeHandler)

        //del
        server.del('/api/buku',BukuBisnisLogic.DeleteBukuHandler)
        server.del('/api/menu',MenuBisnisLogic.DeleteMenuHandler)
        server.del('/api/penerbit',PenerbitBisnisLogic.DeletePenerbitHandler)
        server.del('/api/agama',AgamaBisnisLogic.DeleteAgamaHandler)
        server.del('/api/pengarang',PengarangBisnisLogic.DeletePengarangHandler)
        server.del('/api/type',TypeBisnisLogic.DeleteTypeHandler)

        // error handler
        // server.use(function(err, req, res, next) {
        //     // set locals, only providing error in development
        //     res.locals.message = err.message;
        //     res.locals.error = req.app.get('env') === 'development' ? err : {};
          
        //     // add this line to include winston logging
        //     winston.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
          
        //     // render the error page
        //     res.status(err.status || 500);
        //     res.render('error');
        //   });

        server.listen(port, () => { 
            console.log('[SERVER] running at port ' + port)
        })
    }
})
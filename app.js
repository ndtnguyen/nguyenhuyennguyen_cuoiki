var express = require('express'),
    handlebars = require('express-handlebars'),
    handlebars_sections = require('express-handlebars-sections'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    wnumb = require('wnumb'),
    moment = require('moment'),
    session = require('express-session'),
    MySQLStore = require('express-mysql-session')(session),
    handleLayout = require('./middle-wares/handleLayout'),
    TrangChuController = require('./controllers/TrangChuController'),
    SanPhamController = require('./controllers/SanPhamController'),
    TaiKhoanController = require('./controllers/TaiKhoanController');
var NguoiMuaController = require('./controllers/NguoiMuaController');
var NguoiBanController = require('./controllers/NguoiBanController');
var AdminController = require('./controllers/AdminController');
var app = express();
var https = require('https');

app.use(morgan('dev'));

app.engine('hbs', handlebars({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: 'views/_layouts/',
    partialsDir: 'views/_partials/',
    helpers: {
        section: handlebars_sections(),
        now: function() {
            return moment().format('D/M/YYYY - HH:mm');
        },
        formatNumber: function (n) {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        },
        LayThoiGian: function() {
            return moment().format('DMYYYYHHmm');
        },
        formatTime: function(t) {
            return moment(t).format('YYYY-MM-DD HH:mm:ss');
        },
        ifCond: function(v1, v2, options) {
            if(v1 === v2) {
            return options.fn(this);
            }
        return options.inverse(this);
        }, 
        formatDate: function(t) {
            return moment(t).format('D/M/YYYY');
        }
    }
}));
app.set('view engine', 'hbs');

app.use(express.static(
    path.resolve(__dirname, 'public')
));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// session

app.use(session({
    secret: 'Z7X7gXzoKBT8h18jwXBEP4T0kJ8=',
    resave: false,
    saveUninitialized: true,
    // store: new fileStore()
    store: new MySQLStore({
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'qldg',
        createDatabaseTable: true,
        schema: {
            tableName: 'sessions',
            columnNames: {
                session_id: 'session_id',
                expires: 'expires',
                data: 'data'
            }
        }
    }),
}));

app.use(handleLayout);
app.use('/', TrangChuController);
app.use('/sanpham', SanPhamController);
app.use('/taikhoan', TaiKhoanController);
app.use('/nguoimua', NguoiMuaController);
app.use('/nguoiban',  NguoiBanController);
app.use('/admin', AdminController);

app.listen(3000);



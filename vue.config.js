let proxyObj = {};
proxyObj['/ws'] = {
    ws: true,
    target: "ws://localhost:8081"
};
proxyObj['/api'] = {
    ws: false,
    target: 'http://gdm.vipgz1.idcfengye.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': ''
    }
}

module.exports = {
    devServer: {
        host: 'localhost',
        port: 8081,
        
        // proxy: {
        //     '/': {
        //         //要访问的跨域的域名
        //         target: 'http://gdm.free.idcfengye.com',
        //         ws: true, // 是否启用websockets
        //         secure:false, // 使用的是http协议则设置为false，https协议则设置为true
        //         //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样客户端端和服务端进行数据的交互就不会有跨域问题
        //         changOrigin: true,
        //     }
        // }
        proxy:{
            '/': {
                target: 'http://gdm.vipgz1.idcfengye.com/',
                pathRewrite: {'^/' : ''},
                changeOrigin:true,
            }
        },
        disableHostCheck:true
 

    },
 
}
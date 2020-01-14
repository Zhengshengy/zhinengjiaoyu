# Nginx + Laravel & bunan front-end integration guide 

###  Part 1. Use  [bunna nginx config file](bunan.laravel.nginx.conf)

This will help you config php & nginx & static file 


##### **PS**
  * please use real path to replace `/path/to/laravel_project/`
  * if you want to use the mock server, please un-comment the below in config file 
  
        #location /api/ {
        #        proxy_pass   http://localhost:8100/api/;
        #}

  * or you can use [Part 2](###part-2)
### Part 2 Laravel API 

 If you want to access data from Laravel API. And you want to pass all requests started with '/api/client', you can add the below
 in your laravel_project`/routes/web.php`:
 
  
    Route::group(['prefix' => 'api'], function () {
        Route::any('{firstPart?}/{rest?}', function ($firstPart=null, $rest = null) {
            return view('app');
        })->where('firstPart', '[^/]*')->where('rest', '.*');
    });


 
 
 
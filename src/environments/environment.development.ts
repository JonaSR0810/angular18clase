export const environment = {
    production: false,
    firebaseConfig : {
        apiKey: "AIzaSyBsq-nQJVWbz2Xm58w87oOS5_rLYFHxMCU",
        authDomain: "recetario-313a1.firebaseapp.com",
        projectId: "recetario-313a1",
        storageBucket: "recetario-313a1.appspot.com",
        messagingSenderId: "253920132122",
        appId: "1:253920132122:web:eb7c39ab4ba8b7f64f25a3",
        measurementId: "G-KK3JSS24BG"
      },
      api:{
        nationalities: 'www.themealdb.com/api/json/v1/1/list.php?a=list',
        categories : 'www.themealdb.com/api/json/v1/1/list.php?c=list',
        listByCategory: 'www.themealdb.com/api/json/v1/1/filter.php?c=',
        listByNationality:'www.themealdb.com/api/json/v1/1/filter.php?a=',
        viewRecipe:'www.themealdb.com/api/json/v1/1/lookup.php?i='
      }
};

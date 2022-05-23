function SetearPorDefecto(){
			
    SetearRangoInicial("premium");//al iniciar la web su valor comienza en premium

    document.getElementById("planPremium").style.color = "red"; //cambio estilo de boton seleccionado
}
SetearPorDefecto();//esto es lo unico que se ejecuta al iniciar la pagina las otras funciones via llamadas.

function SetearRangoInicial(tipoDePlan){
    if(tipoDePlan === "corporate"){
        document.getElementById("resultRango").innerHTML = "----";
    }else{
        document.getElementById("resultRango").innerHTML = tipoDePlan === "starter" ? 50 : 200;
    }
}

function CambiarDePlan(tipoDePlan){

    let tipoDePlanMinuscula = tipoDePlan.toLowerCase();//pasa texto a minuscula

    SetearValorOculto(tipoDePlanMinuscula);
    
    SetearControles(tipoDePlanMinuscula);

}

function SetearValorOculto(tipoDePlan){
    document.getElementById("hiddenPlan").value = tipoDePlan;//Identificador del plan
}

function EstablecerControlesComunes(tipoDePlan){
    LimpiarControles();
    IdentificarBotonPlan(tipoDePlan);
    DesactivarControles(tipoDePlan);
    SetearRangoInicial(tipoDePlan);
}

function SetearControles(tipoDePlan){
    
    if(tipoDePlan  === "starter"){

        EstablecerControlesComunes(tipoDePlan);

        //atributos del rango (tipo de plan)
        document.getElementById("cantidadDeContactos").setAttribute("min", 50);
        document.getElementById("cantidadDeContactos").setAttribute("max", 200);
        document.getElementById("cantidadDeContactos").setAttribute("step", 50);
        document.getElementById("cantidadDeContactos").setAttribute("value", 50);

    }else if(tipoDePlan  === "premium"){

        EstablecerControlesComunes(tipoDePlan);

        //atributos del rango (tipo de plan)
        document.getElementById("cantidadDeContactos").setAttribute("min", 200);
        document.getElementById("cantidadDeContactos").setAttribute("max", 1000);
        document.getElementById("cantidadDeContactos").setAttribute("step", 200);
        document.getElementById("cantidadDeContactos").setAttribute("value", 200);

    }else{
        EstablecerControlesComunes(tipoDePlan);
    }
}

function LimpiarControles(){
        document.getElementById("trimestreResult").innerHTML = " ---- ";
        document.getElementById("semestralResult").innerHTML = " ---- ";
        document.getElementById("anualResult").innerHTML = " ---- ";
}

function IdentificarBotonPlan(tipoDePlan){
    document.getElementById("planStarter").style.color = tipoDePlan === "starter" ? "red" : "black";
    document.getElementById("planPremium").style.color = tipoDePlan === "premium" ? "red" : "black";
    document.getElementById("planCorporate").style.color = tipoDePlan === "corporate" ? "red" : "black";
}

function DesactivarControles(tipoDePlan){

    if(tipoDePlan === "corporate"){
        document.getElementById("cantidadDeContactos").setAttribute("disabled", '');
        document.getElementById("buttonCalcular").setAttribute("disabled", '');
    }else{
        document.getElementById("cantidadDeContactos").removeAttribute("disabled", '');
        document.getElementById("buttonCalcular").removeAttribute("disabled", '');
    }
}

function CotizarPlanes(){
    
    const starterPrice = { 
                        50 : 24 , 
                        100 : 39 , 
                        150 : 56 ,
                        200 : 75 ,
                       };

    const premiumPrice = { 
                        200 : 90 , 
                        400 : 130 , 
                        600 : 170 , 
                        800 : 210 , 
                        1000 : 250,
                       };

    //paso1 : traermos la cantidad de contactos
    let cantidadDeContactos = document.getElementById("cantidadDeContactos").value; //Valor del rango actual

    let planSeleccionado = document.getElementById("hiddenPlan").value;

    let precioPorContactos = 0;

    if(planSeleccionado === "starter"){
         precioPorContactos = starterPrice[cantidadDeContactos];
    }else{
         precioPorContactos = premiumPrice[cantidadDeContactos];
    }


    //paso2 : traermos el valor de la cotización
    let cotizacionDolar = document.getElementById("valorCotizacion").value; //Valor del rango actual
    //paso3 : calcular valores trimestral, semestral, anual
    let trimestral = (precioPorContactos * cotizacionDolar) * 3;
    let semestral = (precioPorContactos * cotizacionDolar) * 6;
    let anual = (precioPorContactos * cotizacionDolar) * 12;
    let PorcentajeAnualDescuento = anual * 0.25;
    let anualConDescuento = anual - PorcentajeAnualDescuento;

    document.getElementById("trimestreResult").innerHTML = trimestral;
    document.getElementById("semestralResult").innerHTML = semestral;
    document.getElementById("anualResult").innerHTML = anual +  " con el 25% OFF quedaria: " + anualConDescuento;

}

function SeleccionarContactos(){
    let cantidadDeContactos = document.getElementById("cantidadDeContactos").value; //Valur del rango actual
    document.getElementById("resultRango").innerHTML = cantidadDeContactos;
}
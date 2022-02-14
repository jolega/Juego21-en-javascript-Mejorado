/**
 * 2C= Two of Clubs (Treboles)
 * 2D= Two of Diaminds(diamantes)
 * 2H= Two of hearts (corazones)
 * 2S= Two of spades (spadas)
 * libreria shuffle https://underscorejs.org/
 */

const miModulo = (() =>{
    'use strict'

        let deck                    = [],
             puntosJugadores        = [];
        const tipos                 =['C','D','H','S'] ,
              especiales            =['A','J','Q','K'];    
        //referencias del html
        const bntNuevo              = document.querySelector("#btnNuevo"),
              bntPedir              = document.querySelector("#btnPedir"),
              bntDetener            = document.querySelector("#btnDetener"),
              htmlPuntosJugador     = document.querySelectorAll("small"),
              divCartasJugadores     = document.querySelectorAll(".divCartas")

              
        
        const inicializarJuego = (numJugadores =2) => {
            
            deck = crearDeck();
            puntosJugadores=[]
            for(let crearJugadores=0 ; crearJugadores < numJugadores ; crearJugadores++){
                puntosJugadores.push(0)
            }   
            
            htmlPuntosJugador.forEach(elem => elem.innerText = 0 );
            divCartasJugadores.forEach(elem => elem.innerText = '' );

            bntPedir.disabled       = false;
            bntDetener.disabled     = false;
        }      
       
        // esta funcion crear una nueva bajara 
        const crearDeck = () => {
            deck = []        
            for(let i=2; i<= 10; i++){
                for(let tipo of tipos){
                    deck.push(i+ tipo)
                }
        
            }
            for(let tipo of tipos){
                for(let especial of especiales){
                deck.push(especial+ tipo);
                }
            }
        return  _.shuffle(deck);
        }

        // esta funcion me permite tomar una carta
        const pedirCarta = () => {
        
            if(deck.length === 0 ){
                throw 'No hay cartas en el deck'
            }
            return deck.pop();       
        }

        //valor de la carta() 
        const valorCarta = (carta) => {
            const valor = carta.substring(0,carta.length-1);
             return (isNaN(valor)) ?
                (valor=== 'A') ? 11 : 10
                :  valor *1;
        }
        
        // Turno 0 = primer Jugador y el ultimo sera la computadora
        const acumularPuntos = ( carta, turno ) => {
            puntosJugadores[turno]  = puntosJugadores[turno] + valorCarta(carta);
            htmlPuntosJugador[turno].innerText = puntosJugadores[turno] 
            return puntosJugadores[turno] ;
        }
        //pintarcarta
        const crearCarta = (carta, turno) => {
            const imgCarta= document.createElement('img');
            imgCarta.classList.add('carta')
            imgCarta.src=`assets/cartas/${ carta }.png`;
            divCartasJugadores[turno].append(imgCarta);
        }

        const determinarGanador = () => {

            const [puntosMinimos, puntosComputador ] = puntosJugadores
            setTimeout(() => {
                if(puntosMinimos < puntosComputador ){
                    alert("Gana el Jugador")
            }
            else if(puntosMinimos === puntosComputador){
                alert("Nadie gana")
            }
            else{
                    alert("Gana la Computadora")
            } 
            }, 80);
          
        }
        //turno de la computadora
        const turnocomputadora = (puntosMinimos) => {


            let puntosComputador=0;
            do{
                const carta = pedirCarta();
                puntosComputador= acumularPuntos(carta, puntosJugadores.length-1 );
                crearCarta (carta, puntosJugadores.length-1 );
        
            }while((puntosComputador < puntosMinimos) && puntosMinimos <=  21 )
            determinarGanador();
        }

        bntPedir.addEventListener('click', () => {
            const carta = pedirCarta();
           const puntosJugador = acumularPuntos( carta , 0 )
          crearCarta (carta, 0 );

            if(puntosJugador > 21 ){
            
                bntPedir.disabled=true;
                bntDetener.disabled=true;
                console.log("has perdido")
                turnocomputadora (puntosJugador);

            } else if(puntosJugador === 21){
                console.log("21 Genial!")
                bntPedir.disabled=true;
                bntDetener.disabled=true;
                turnocomputadora (puntosJugador);
            }
        })

        bntDetener.addEventListener('click', () => {
        bntPedir.disabled=true;
        bntDetener.disabled=true;
        turnocomputadora (puntosJugadores[0]);
        
        })

        bntNuevo.addEventListener('click', () => {
            inicializarJuego();
        })

        return{
            nuevoJuego : inicializarJuego
        };
}) ();


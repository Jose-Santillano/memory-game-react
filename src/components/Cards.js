import React, { useState } from 'react';
import Swal from 'sweetalert2';

//Components
import Card from './Card';

function Cards() {

    //Items del juego del memorama.
    const [items, setItems] = useState([
        { id: 1, img: '/img/javascript.png', stat: '' },
        { id: 1, img: '/img/javascript.png', stat: '' },
        { id: 2, img: '/img/css.png', stat: '' },
        { id: 2, img: '/img/css.png', stat: '' },
        { id: 3, img: '/img/react.png', stat: '' },
        { id: 3, img: '/img/react.png', stat: '' },
        { id: 4, img: '/img/mongodb.png', stat: '' },
        { id: 4, img: '/img/mongodb.png', stat: '' },
        { id: 5, img: '/img/html.png', stat: '' },
        { id: 5, img: '/img/html.png', stat: '' },
        { id: 6, img: '/img/nodejs.png', stat: '' },
        { id: 6, img: '/img/nodejs.png', stat: '' },
        { id: 7, img: '/img/vscode.png', stat: '' },
        { id: 7, img: '/img/vscode.png', stat: '' },
        { id: 8, img: '/img/github.png', stat: '' },
        {id: 8, img: '/img/github.png', stat: ''}
    ].sort(() => Math.random() - 0.5));

    //Funcion para verificar si se cumplen o no los items correctos/incorrectos.
    const check = (current) => {
        //Si el item seleccionado es igual al otro item seleccionado (anterior) se marcara con verde y se actualizara el estado de el array de items.
        if (items[current].id === items[prev].id) {
            items[current].stat = "correct";
            items[prev].stat = "correct";
            setItems([...items]);
            setPrev(-1);
            //Verificamos cada vez para reiniciar.
            checkReset();
        } else {
            //En caso contrario se pone incorrecto y se actualiza el array de items. 
            items[current].stat = "wrong";
            items[prev].stat = "wrong";
            //Act. el estado con los items.
            setItems([...items]);
            //Pequeño intervalo para actualizar estado.
            setTimeout(() => {
                items[current].stat = "";
                items[prev].stat = "";
                setItems([...items]);
                setPrev(-1);
            }, 1000);
        }
    }

    //Funcion click para revisar el elemento seleccionado mediante su id y activarlo.
    const handleClick = (id) => {
        if (prev === -1) {
            items[id].stat = "active";
            setPrev(id);
        } else {
            check(id)
        }
    }

    const [prev, setPrev] = useState(-1);

    //Funcion para reiniciar juego y mostrar al ganador.

    const checkReset = () => {
        let band = true;

        //Verificamos todos los items para ver si ninguno esta vacio. (si uno lo esta es que aun no han terminado)
        items.forEach(element => {
            if (element.stat == "") {
                band = false;
            }
        });

        //Si el true se mantiene es porque el juego se terminó.
        if (band) {
            Swal.fire("¡Felicidades!", "Haz completado el mini juego", 'success');
            items.forEach(element => element.stat="");
        }
    }

    return (
        <div className='container'>
            {
                items.map((item, index) => {
                    console.log(item.img);
                    return <Card key={index} item={item} id={index} handleClick={handleClick} />
                })
            }
        </div>
    );
}

export default Cards;
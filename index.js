const Title = ({ counter }) => {
    const styles = {
        container:{
            display: 'flex',
            flexDirection: 'row',
            height: '90px',
            width: '100%',
            alignItems:'center',
            justifyContent: 'space-between',
            background: 'black'
        },
        paragraph:{
            fontSize: '30px',
            margin:'60px',
            color:'#ecdca9'
        },
        h1:{
            margin: '60px',
            color:'#ecdca9',
        }
    }
    

    return(
        <div style={styles.container}>
           
            <div style = {styles.paragraph}>{counter} movimientos</div>
        </div>       
    )
}

const RestartAlert = () => {
    
    const styles = {
        container: {
            marginTop: '150px',
            height: '300px',
            width: '300px',
            background: '#bd082b',
            display: 'flex',
            alignItems:'center',
            justifyContent: 'center',
            flexDirection: 'column',
            borderRadius: '15px'
        },
        button: {
            height: '50px',
            width: '150px',
            background: '#ecdca9',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '10px',
        }
    }
    
    return(
        <div style={styles.container}>
            <h1 style = {{marginBottom: '50px'}}>!Has ganado!</h1>
            <div style = {styles.button} onClick = {()=>{location.reload()}}>Vuelve a jugar</div>
        </div>
    )
}

const Card = ({imagen, state, onFlip}) => {
    const styles = {
        container:{
            transition: 'all 1s ease-out',
            transform: 'rotateY(0deg)',
            background: 'black',
            height: '250px',
            transformStyle: 'preserve-3d',
            backgroundSize: '190px',
            boxShadow: '#4C4747 0px 7px 20px 0px',
        },
        image:{
            height: '100%',
            width: '100%',
            objectFit: 'cover'
        }
    }

    return(
        <div style={{...styles.container, transform: state ? 'rotateY(180deg)': 'rotateY(0deg)'}}  onClick ={onFlip}>
            <img style={styles.image} src={`${state ? imagen : './mask.jpeg'}`}></img>
        </div>
    )
}


const Grid = ({array}) => {

    let images = ['./tanjiro.jpg', './rengoku.webp', './shinobu.jpg', './zenitsu.jpg',
                    'inosuke.gif', 'tomioka.webp', 'uro.jpg', 'tengen.jpg']
    const styles = {
        grid: {
            margin: '40px',
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '10px',
            height: '550px',
            width: '1450px',
            gridAutoRows: 'minmax(100px, auto)'
        },
        container: {
            width: '100%', 
            display:'flex', 
            flexDirection:'column', 
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
    
    const [last, setLast] = React.useState(null)
    const [timer, setTimer] = React.useState(false)
    const[counter, setCounter] = React.useState(0)

    const [finished, setFinished] = React.useState(false)
    const cant = React.useRef(0)
    
    const[cards, setCards] = React.useState(array.map((element) => {
        return {
            id: element,
            img: images[element-1],
            flipped: false
        }
    }))
    

    
    const flip = (index) => {
        if(!timer && !cards[index].flipped){
            if(last === null) {
                const oldCards = [...cards]
                setLast(index)
                oldCards[index].flipped = true
                setCards(oldCards)
            } else {
                const oldCards = [...cards]
                oldCards[index].flipped = true
                setCards(oldCards)
                const id = oldCards[index].id
                const oldId = oldCards[last].id
                if (id === oldId){
                    cant.current++
                    if (cant.current === 8){
                        setTimeout(() => {
                            setFinished(true)
                        },1000)
                    }
                    setLast(null)
                }
                else{
                    setTimer(true)
                    setTimeout(() => {
                        unflip(index, last)
                        setLast(null)
                        setTimer(false)
                    }, 2000)
                }
                
                setCounter(counter + 1)
            }
        }
    }

    const unflip = (index1, index2) => {
        const oldCards = [...cards]
        oldCards[index1].flipped = false
        oldCards[index2].flipped = false
        setCards(oldCards)
    }
 
    return (

        <div style = {styles.container}>
            <Title counter = {counter} />
            {
                finished ? <RestartAlert /> :
                <div style = {styles.grid}>
                    {cards.map((card, index)=> {
                        return(<Card key={index} imagen={card.img} onFlip={() => flip(index)} state = {card.flipped} />);
                    })}
                 </div>
            }
        </div>   
    )
        
}

const createRandomArray = () => {
    let array = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    for(let i = 0;i<array.length;i++){
        let random = Math.floor(Math.random()* (i-1) + 1)
        let temp = array[i]
        array[i] = array[random]
        array[random] = temp
    }
    return array;
}

const App = () => {
    document.body.style.height = '100vh';
    document.body.style.width = '100vw';
    document.body.style.margin = '0px';

    const array = createRandomArray()

    const styles = {
        container:{
            flexGrow: 1, 
            display: 'flex',
            flexDirection: 'column',
            height: '100vh',
            width: '100vw',
            alignItems:'center',
            background: 'black'
        },
        header: {
            height: '100%',
            width: '100%'
        }
    }
    return (
        <div style = {styles.container}>
           <Grid array = {array}/>
        </div>
    )
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
)
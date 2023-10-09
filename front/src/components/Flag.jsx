const Flag = ({ code }) => {
    if(code) {
        return <img src={`https://flagcdn.com/h40/${code}.png`} />  
    }
} 

export default Flag
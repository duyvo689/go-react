import 'bootstrap/dist/css/bootstrap.css'
import {Button, Card,Row, Col} from 'react-bootstrap'

interface Props {
    entryData: any
    deleteSingleEntry:(id:any)=>void
    setChangeIngredient:(value:any)=>void
    setChangeEntry:(value:any)=>void
}

const Entry = ({entryData,deleteSingleEntry,setChangeIngredient,setChangeEntry}:Props) => {
    return (
        <Card>
            <Row>
                <Col>Dish:{entryData!== undefined && entryData.dish}</Col>
                <Col>Ingredients:{entryData!== undefined && entryData.ingredients}</Col>
                <Col>Calories:{entryData!== undefined && entryData.calories}</Col>
                <Col>Fat:{entryData !== undefined && entryData.fat}</Col>
                <Col><Button onClick={()=>deleteSingleEntry(entryData._id)}>Detele entry</Button></Col>
                <Col><Button onClick={()=>changeIngredient()}>Change ingredient</Button></Col>
                <Col><Button onClick={()=>changeEntry()}>change entry</Button></Col>
            </Row>
        </Card>
    )

    function changeIngredient() {
        setChangeIngredient({
            "change": true,
            "id":entryData._id
        })
    }

    function changeEntry() {
        setChangeEntry({
            "change": true,
            "id":entryData._id
        })
    }
}

export default Entry
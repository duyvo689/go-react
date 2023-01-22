import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Container, Modal } from 'react-bootstrap'

import Entry from "./single-entry.component"

const Entries = () => {
    
    const [entries,setEntries] = useState<any>([])
    const [refreshData,setRefreshData] = useState<any>(false)
    const [changeEntry,setChangeEntry] = useState<any>({"change":false,"id":0})
    const [changeIngredient,setChangeIngredient] = useState<any>({"change":false,"id":0})
    const [newIngredientName,setNewIngredientName] = useState<any>("")
    const [addNewEntry,setAddNewEntry] = useState<any>(false)
    const [newEntry, setNewEntry] = useState<any>({ "dish": "", "ingredients": "", "calories": 0, fat: 0 })
    
    useEffect(() => { getAllEntries() }, [])
    
    if (refreshData) {
        setRefreshData(false)
        getAllEntries()
    }
    return (
        <div>
            <Container>
                <Button onClick={()=>setAddNewEntry(true)}>Track today's calories</Button>
            </Container>
            <Container>
                {entries != null && entries.length > 0 && entries.map((entry:any, i:any)=>
                <Entry entryData={entry} deleteSingleEntry={deleteSingleEntry} setChangeEntry={setChangeEntry} setChangeIngredient={setChangeIngredient} />
                )}
            </Container>
            <Modal show={addNewEntry} onHide={()=>setAddNewEntry(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add Calorie Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>dish</Form.Label>
                        <Form.Control onChange={(envent) => { newEntry.dish = envent.target.value }}></Form.Control>
                         <Form.Label>ingredients</Form.Label>
                        <Form.Control onChange={(envent) => { newEntry.ingredients = envent.target.value }}></Form.Control>
                         <Form.Label>calories</Form.Label>
                        <Form.Control onChange={(envent) => { newEntry.calories = envent.target.value }}></Form.Control>
                         <Form.Label>fat</Form.Label>
                        <Form.Control type="number" onChange={(envent) => { newEntry.fat = envent.target.value }}></Form.Control>
                    </Form.Group>
                     <Button onClick={() =>addNewEntry}>Add</Button>
                        <Button onClick={() =>setAddNewEntry(false)}>Cancel</Button>
                </Modal.Body>
            </Modal>
            <Modal show={changeIngredient.change} onHide={() => setChangeIngredient({ 'change': false, "id": 0 })} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Ingredients</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>new ingredients</Form.Label>
                        <Form.Control onChange={(envent) => { setNewIngredientName( envent.target.value )}}></Form.Control>
                    </Form.Group>
                     <Button onClick={() =>changeIngredientForEntry()}>Change</Button>
                        <Button onClick={() =>setChangeIngredient({"change":false,"id":0})}>Cancel</Button>
                </Modal.Body>
            </Modal>

            <Modal show={changeEntry.change} onHide={() => setChangeEntry({ 'change': false, "id": 0 })} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Change Entry</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                         <Form.Label>dish</Form.Label>
                        <Form.Control onChange={(envent) => { newEntry.dish = envent.target.value }}></Form.Control>
                         <Form.Label>ingredients</Form.Label>
                        <Form.Control onChange={(envent) => { newEntry.ingredients = envent.target.value }}></Form.Control>
                         <Form.Label>calories</Form.Label>
                        <Form.Control onChange={(envent) => { newEntry.calories = envent.target.value }}></Form.Control>
                         <Form.Label>fat</Form.Label>
                        <Form.Control type="number" onChange={(envent) => { newEntry.fat = envent.target.value }}></Form.Control>
                    </Form.Group>
                     <Button onClick={() =>changeSingleEntry()}>Change</Button>
                        <Button onClick={() =>setChangeEntry({"change":false,"id":0})}>Cancel</Button>
                </Modal.Body>
            </Modal>
        </div>

    )


    function changeIngredientForEntry() {
        changeEntry.change = false;
        var url = "http://localhost:8000/ingredient/update" + changeIngredient.id
        axios.put(url, newIngredientName).then(response => {
            if (response.status === 200) {
                setRefreshData(true);
        }})
    }


    function changeSingleEntry() {
        changeEntry.change = false;
        var url = "http://localhost:8000/entry/update"
        axios.put(url, newEntry).then(response => {
            if (response.status === 200) {
                setRefreshData(true);
        }})
    }

    function addSingleEntry() {
    setAddNewEntry(false)
    var url = "http://localhost:8000/entry/create"
    axios.post(url, {
        "ingredients": newEntry.ingredients,
        "dish": newEntry.dish,
        "calories": newEntry.calories,
        "fat": parseFloat(newEntry.fat)
    }).then(response => {
        if (response.status==200) {
    setRefreshData(true)
            
        }
    })
}

function deleteSingleEntry(id:any) {
    var url = "http://localhost:8000/entry/delete" + id
    axios.delete(url, {}).then(response => { 
        if (response.status == 200) {
               setRefreshData(true)
        }
    })
}

function getAllEntries() {
    var url = "http://localhost:8000/entries"
    axios.get(url, { responseType: 'json' }).then(response => {
        if (response.status == 200) {
        setEntries(response.data)
    }})

}
}

export default Entries;
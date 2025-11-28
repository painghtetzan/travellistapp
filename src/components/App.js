// Initial packing items
import { useState } from "react";


function Logo() {
  return <h1>My Travel List</h1>;
}

function Form(props) {
  const [description,setDescription] = useState('')
  const [quantity,setQuantity] = useState(1)
  function handleSubmit(e){
    e.preventDefault()
    props.setInitialItems(prev=>{
     return [...prev,{id:props.initialItems.length+1,description:description,quantity:quantity}]
    })
    setDescription('')
    setQuantity(1)
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select value={quantity} onChange={e=>setQuantity(e.target.value)}>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
      </select>
      <input placeholder="Item..." value={description} onChange={e=>setDescription(e.target.value)}></input>
      <button>Add</button>
    </form>
  );
}

function Item(props){

  function handlePack(index){
    props.setInitialItems(prev=>prev.map((item,i)=>{
      if(i===index){
        return {...item,packed:!item.packed}
      }return item
    }))
  }

  function handleDelete(index){
    props.setInitialItems(prev=>prev.filter((item,i)=>i!==index)
    )
  }

  return <li>
    <span style={{textDecoration:props.packed?'line-through':''}}>
  {props.description} {props.quantity}
    </span>
    <input type="checkbox" onChange={()=>handlePack(props.index)}></input>
    <button onClick={()=>{handleDelete(props.index)}} >Delete</button>
  </li>
}

function PackingList(props) {
  return ( 
    <div className="list">
      <ul>
        {props.initialItems.map((item,i) => (
          <Item description={item.description} quantity={item.quantity} packed={item.packed} index={i} setInitialItems={props.setInitialItems} />
        ))}
      </ul>
    </div>
  );
}

function Stats(props) {
  const totalitem = props.initialItems.length
  const packedItem = props.initialItems.filter(item=>item.packed===true).length
  const percentage = (packedItem/totalitem)*100
  return (
    <footer className="stats">
      <em>You have {totalitem} items in the list. You already packed {packedItem} ({percentage}%).</em>
    </footer>
  );
}

function App() {
  const [initialItems,setInitialItems] = useState([
  { id: 1, description: "Shirt", quantity: 5, packed: false },
  { id: 2, description: "Pants", quantity: 2, packed: false },
]);

  return (
    <div className="app">
      <Logo />
      <Form setInitialItems={setInitialItems} initialItems={initialItems} />
      <PackingList initialItems={initialItems} setInitialItems={setInitialItems} />
      <Stats initialItems={initialItems} />
    </div>
  );
}

export default App;

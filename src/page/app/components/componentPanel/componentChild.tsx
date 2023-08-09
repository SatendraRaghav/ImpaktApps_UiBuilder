const ComponentChild = ({id}:any) => {
  return (
    <div style={{height:"25px",
    padding:"4px 10px",
    borderRadius:"5px",
    width:"45px",
    marginBottom:"10px",
    display:"flex",alignItems:"center",border:"1px solid black",
    justifyContent:"center"
  }}>{id}</div>
  )
}

export default ComponentChild;
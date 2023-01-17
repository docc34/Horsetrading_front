import ReactDataGrid from '@inovua/reactdatagrid-community'
import '@inovua/reactdatagrid-community/index.css'
import { useState, useEffect } from 'react'

const Home = ()=>{
    const [enableSelection, setEnableSelection] = useState(false);
    const [auctioneers, setAuctioneers] = useState([]);

    const columns = [
        {name:"id", header: "Id",  defaultVisible: false},
        {name:"username" , header:"Käyttäjänimi", defaultFlex:2},
        {name:"email" , header:"Sähköposti",  defaultFlex:2},
        {name:"price" , header:"Hinta", type: "number", defaultFlex:1}
    ]

    useEffect( async ()=>{
        var search = await fetch("https://localhost:44371/api/Auctioneers",{type:'GET'});
        var auctioneers = await search.json();
        if(auctioneers != null || auctioneers != undefined){
            setAuctioneers(await auctioneers);
        }
        
    },[]);

    return(<div>
        
        <h1>Huutokauppa!</h1>
        <ReactDataGrid
        idProperty="id"
        //style={}
        columns={columns}
        dataSource={auctioneers}
        enableSelection={enableSelection}
        defaultSortInfo={{name: "price",  dir: -1, type: 'number'}}
        sortable={false}
        //onSelectionChange={onSelectionChange}
        >
        </ReactDataGrid>
    </div>)
}

export {Home}
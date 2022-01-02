import React , { useState, useEffect } from "react";
import Card from '../../components/card/card';
import './results.css'
import Api from '../../api/api';
import Spinner from "../../components/spinner/spinner";

const ResultsPage=()=>{
  const [playersData, setPlayersData] = useState([]);
  async function getData() {
    await Api.get('/')
      .then(({ data }) => {
        data.sort((b, a) => a.Completed - b.Completed);
        setPlayersData(data);
      })
      .catch((e) => console.log(e));
  }
  useEffect(() => {
    getData();
  }, []);
  function display() {
    return (
      <div className="ResultsPage">
        <h1>Results Page</h1>
        <div className="card-container">
          {playersData.map(({ id, name, avatar, Completed, Uncompleted,createdAt}) => (
            <Card
              key={id}
              name={name}
              avatar={avatar}
              createdAt={createdAt}
              Completed={Completed}
              Uncompleted={Uncompleted}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      {playersData.length ? display() :<Spinner/>}
    </div>
  );
}

export default ResultsPage;
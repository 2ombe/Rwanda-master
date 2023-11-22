import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

function MarketList() {
  const [markets, setMarkets] = useState([]);

  useEffect(() => {
    async function fetchMarkets() {
      const response = await fetch("/api/markets");
      const data = await response.json();
      setMarkets(data);
    }
    fetchMarkets();
  }, []);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Name</th>
          <th>Location</th>
          <th>Activities</th>
          <th>Budget</th>
          <th>Timeline</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {markets.map((market) => (
          <tr key={market.id} className={`table-${market.statusColor}`}>
            <td>{market.name}</td>
            <td>{market.location}</td>
            <td>{market.activities}</td>
            <td>{market.budget}</td>
            <td>{new Date(market.timeline).toLocaleDateString()}</td>
            <td>{market.status}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default MarketList;

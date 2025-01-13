
export default function SuppliersPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Suppliers</h2>
      <table>
        <thead>
          <tr>
            <th>Supplier Name</th>
            <th>Payment Method</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Global Supplies</td>
            <td>Bank Transfer</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
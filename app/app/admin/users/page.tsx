
export default function UsersPage() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Users</h2>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Business Name</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>jane@example.com</td>
            <td>Jane Doe</td>
            <td>Jane&apos; Shop</td>
            <td>(123) 456-7890</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
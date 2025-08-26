import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rides = [
  {
    id: "1",
    driver: "John Doe",
    from: "Dhaka",
    to: "Chittagong",
    price: 1200,
    status: "Completed",
  },
  {
    id: "2",
    driver: "Jane Smith",
    from: "Dhaka",
    to: "Sylhet",
    price: 800,
    status: "Pending",
  },
  {
    id: "3",
    driver: "Robert Lee",
    from: "Khulna",
    to: "Dhaka",
    price: 1500,
    status: "Ongoing",
  },
];

const MyRides = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Rides</h1>
      <Table>
        <TableCaption>A list of your recent rides.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Driver</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rides.map((ride) => (
            <TableRow key={ride.id}>
              <TableCell>{ride.id}</TableCell>
              <TableCell>{ride.driver}</TableCell>
              <TableCell>{ride.from}</TableCell>
              <TableCell>{ride.to}</TableCell>
              <TableCell>{ride.price} BDT</TableCell>
              <TableCell>{ride.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyRides;

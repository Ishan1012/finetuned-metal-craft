// import { Button } from "../../components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { useState, useEffect } from "react";
import { contactAPI, Contact } from "../../lib/api-services";
import { toast } from "sonner";
export default function ManageContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const fetchedContacts = await contactAPI.getContacts();
      setContacts(fetchedContacts);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      toast.error('Failed to load contacts');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Contacts</h1>
      </div>
      <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] bcontact-none p-6 overflow-hidden">
        {loading ? (
          <div className="p-6 text-center text-gray-500">Loading contacts...</div>
        ) : contacts.length === 0 ? (
          <div className="p-6 text-center text-gray-500">No contacts found</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>S.no.</TableHead>
                <TableHead>Customer Name</TableHead>
                <TableHead>Customer Email</TableHead>
                <TableHead>Customer Phone</TableHead>
                <TableHead>More Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((contact, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell className="text-justify max-w-xs">
                    <span className="line-clamp-3">
                      {contact.message}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
}
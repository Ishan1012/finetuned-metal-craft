import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { useState, useEffect } from "react";
import { quoteAPI, Quote } from "../../lib/api-services";
import { toast } from "sonner";

export default function ManageQuotes() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuotes();
    }, []);

    const fetchQuotes = async () => {
        try {
            setLoading(true);
            const fetchedQuotes = await quoteAPI.getQuotes();
            setQuotes(fetchedQuotes);
        } catch (error) {
            console.error('Failed to fetch quotes:', error);
            toast.error('Failed to load quotes');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Manage Quotes</h1>
            </div>

            <div className="bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.05)] border-none p-6 overflow-x-auto">
                {loading ? (
                    <div className="p-6 text-center text-gray-500">Loading quotes...</div>
                ) : quotes.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">No quotes found</div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="whitespace-nowrap">Quote ID</TableHead>
                                <TableHead className="whitespace-nowrap">Name</TableHead>
                                <TableHead className="whitespace-nowrap">Email</TableHead>
                                <TableHead className="whitespace-nowrap">Phone</TableHead>
                                <TableHead className="whitespace-nowrap">Location</TableHead>
                                <TableHead className="whitespace-nowrap">Project Type</TableHead>
                                <TableHead className="whitespace-nowrap">Material</TableHead>
                                <TableHead className="whitespace-nowrap text-center">Length</TableHead>
                                <TableHead className="whitespace-nowrap text-center">Width</TableHead>
                                <TableHead className="whitespace-nowrap text-center">Qty</TableHead>
                                <TableHead className="whitespace-nowrap">Timeline</TableHead>
                                <TableHead className="whitespace-nowrap">Budget</TableHead>
                                <TableHead className="whitespace-nowrap">Design</TableHead>
                                <TableHead className="whitespace-nowrap">Attachments</TableHead>
                                <TableHead className="whitespace-nowrap">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {quotes.map((quote: any) => (
                                <TableRow key={quote._id}>
                                    <TableCell className="font-medium whitespace-nowrap">
                                        {quote._id ? quote._id.slice(-6).toUpperCase() : 'N/A'}
                                    </TableCell>

                                    {/* Separated Customer Info */}
                                    <TableCell className="whitespace-nowrap font-medium">{quote.name}</TableCell>
                                    <TableCell className="whitespace-nowrap text-gray-600">{quote.email}</TableCell>
                                    <TableCell className="whitespace-nowrap text-gray-600">{quote.phone}</TableCell>
                                    <TableCell className="whitespace-nowrap text-gray-600">{quote.location}</TableCell>

                                    {/* Separated Project Details */}
                                    <TableCell className="whitespace-nowrap font-medium">{quote.projectType}</TableCell>
                                    <TableCell className="whitespace-nowrap text-gray-600">{quote.material}</TableCell>

                                    {/* Separated Specs */}
                                    <TableCell className="whitespace-nowrap text-center">{quote.length}</TableCell>
                                    <TableCell className="whitespace-nowrap text-center">{quote.width}</TableCell>
                                    <TableCell className="whitespace-nowrap text-center">{quote.quantity}</TableCell>

                                    <TableCell className="whitespace-nowrap">{quote.timeline}</TableCell>

                                    <TableCell>
                                        <div className={!quote.budget ? "hidden" : "text-sm mb-1"}>
                                            {quote.budget}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className={!quote.design ? "hidden" : "text-sm mb-1"}>
                                            {quote.design}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {(!quote.image || quote.image === "/images/placeholder.png") ? "No Attachments" : (
                                            <div className={!quote.image || quote.image === "/images/placeholder.png" ? "hidden" : "mt-2"}>
                                            <a
                                                href={quote.image}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="text-blue-600 text-xs underline hover:text-blue-800 whitespace-nowrap"
                                            >
                                                View Attachment
                                            </a>
                                        </div>
                                        )}
                                    </TableCell>

                                    <TableCell className="whitespace-nowrap">
                                        {quote.createdAt ? new Date(quote.createdAt).toLocaleDateString() : 'N/A'}
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
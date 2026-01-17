import React, { useState, useRef } from 'react';
import { FileText, Upload, Download, Trash2, Share2 } from 'lucide-react';
import SignatureCanvas from 'react-signature-canvas';
import { Card, CardHeader, CardBody } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

type DocumentItem = {
  id: number;
  name: string;
  type: string;
  size: string;
  lastModified: string;
  shared: boolean;
  status: 'Draft' | 'In Review' | 'Signed';
};

const documentsData: DocumentItem[] = [
  { id: 1, name: 'Pitch Deck 2024.pdf', type: 'PDF', size: '2.4 MB', lastModified: '2024-02-15', shared: true, status: 'Draft' },
  { id: 2, name: 'Financial Projections.xlsx', type: 'Spreadsheet', size: '1.8 MB', lastModified: '2024-02-10', shared: false, status: 'In Review' },
  { id: 3, name: 'Business Plan.docx', type: 'Document', size: '3.2 MB', lastModified: '2024-02-05', shared: true, status: 'Signed' },
  { id: 4, name: 'Market Research.pdf', type: 'PDF', size: '5.1 MB', lastModified: '2024-01-28', shared: false, status: 'Draft' },
];

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DocumentItem[]>(documentsData);
  const [showCanvasId, setShowCanvasId] = useState<number | null>(null); 
  const sigRef = useRef<SignatureCanvas>(null);

  const signDocument = (id: number) => {
    setDocuments(prev =>
      prev.map(doc => (doc.id === id ? { ...doc, status: 'Signed' } : doc))
    );
    sigRef.current?.clear();
    setShowCanvasId(null);
  };

  const toggleCanvas = (id: number) => {
    setShowCanvasId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documents</h1>
          <p className="text-gray-600">Manage your startup's important files</p>
        </div>

        <Button leftIcon={<Upload size={18} />} variant="primary">
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Storage Info */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <h2 className="text-lg font-medium text-gray-900">Storage</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Used</span>
                <span className="font-medium text-gray-900">12.5 GB</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-primary-600 rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Available</span>
                <span className="font-medium text-gray-900">7.5 GB</span>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Quick Access</h3>
              <div className="space-y-2">
                {['Recent Files', 'Shared with Me', 'Starred', 'Trash'].map(item => (
                  <button
                    key={item}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Document List */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">All Documents</h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">Sort by</Button>
                <Button variant="outline" size="sm">Filter</Button>
              </div>
            </CardHeader>
            <CardBody className="space-y-2">
              {documents.map(doc => (
                <Card key={doc.id} className="p-2">
                  <CardBody className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                    {/* File Icon and Info */}
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary-50 rounded-lg">
                        <FileText size={24} className="text-primary-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{doc.name}</h3>
                          {doc.shared && (
                            <Badge variant="secondary" size="sm">
                              Shared
                            </Badge>
                          )}
                          {doc.status === 'Draft' && (
                            <Badge variant="secondary" size="sm" className="bg-yellow-200 text-yellow-800">
                              Draft
                            </Badge>
                          )}
                          {doc.status === 'In Review' && (
                            <Badge variant="secondary" size="sm" className="bg-blue-200 text-blue-800">
                              In Review
                            </Badge>
                          )}
                          {doc.status === 'Signed' && (
                            <Badge variant="secondary" size="sm" className="bg-green-200 text-green-800">
                              Signed
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-500 flex-wrap">
                          <span>{doc.type}</span>
                          <span>{doc.size}</span>
                          <span>Modified {doc.lastModified}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2 sm:mt-0">
                      <Button variant="ghost" size="sm" className="p-2" onClick={() => toggleCanvas(doc.id)}>
                        {doc.status === 'Draft' ? 'Sign' : 'View'}
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2" aria-label="Download">
                        <Download size={18} />
                      </Button>
                      <Button variant="ghost" size="sm" className="p-2" aria-label="Share">
                        <Share2 size={18} />
                      </Button>
                      <Button variant="secondary" size="sm" className="p-2" aria-label="Delete">
                        <Trash2 size={18} />
                      </Button>
                    </div>

                    {/* Signature Canvas */}
                    {showCanvasId === doc.id && doc.status === 'Draft' && (
                      <div className="w-full mt-2">
                        <SignatureCanvas
                          ref={sigRef}
                          canvasProps={{ className: 'border w-full h-24 rounded' }}
                        />
                        <div className="flex justify-end mt-2 gap-2">
                          <Button size="sm" variant="primary" onClick={() => signDocument(doc.id)}>
                            Confirm Signature
                          </Button>
                          <Button size="sm" variant="secondary" onClick={() => setShowCanvasId(null)}>
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardBody>
                </Card>
              ))}
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

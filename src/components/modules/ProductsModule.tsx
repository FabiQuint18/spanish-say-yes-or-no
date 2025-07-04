
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Package, Plus, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  code: string;
  name: string;
  type: string;
  description: string;
  created_at: string;
}

const ProductsModule = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: '',
    description: ''
  });

  // Load products from localStorage on component mount
  useEffect(() => {
    const savedProducts = localStorage.getItem('systemProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleAddProduct = () => {
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.code || !formData.name || !formData.type) {
      toast({
        title: "Error",
        description: "Todos los campos obligatorios deben ser completados",
        variant: "destructive",
      });
      return;
    }

    // Check if code already exists
    if (products.some(product => product.code === formData.code)) {
      toast({
        title: "Error",
        description: "Ya existe un producto con este código",
        variant: "destructive",
      });
      return;
    }

    // Create new product
    const newProduct: Product = {
      id: Date.now().toString(),
      code: formData.code,
      name: formData.name,
      type: formData.type,
      description: formData.description,
      created_at: new Date().toISOString()
    };

    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('systemProducts', JSON.stringify(updatedProducts));

    toast({
      title: t('products_created'),
      description: `${t('products_product')} ${formData.name} ${t('products_added_successfully')}`,
    });
    
    setShowForm(false);
    setFormData({ code: '', name: '', type: '', description: '' });
  };

  const handleClose = () => {
    setShowForm(false);
    setFormData({ code: '', name: '', type: '', description: '' });
  };

  const handleDeleteProduct = (productId: string) => {
    const updatedProducts = products.filter(product => product.id !== productId);
    setProducts(updatedProducts);
    localStorage.setItem('systemProducts', JSON.stringify(updatedProducts));
    
    toast({
      title: "Producto Eliminado",
      description: "Producto eliminado exitosamente",
    });
  };

  const getProductTypeLabel = (type: string) => {
    switch (type) {
      case 'producto_terminado':
        return t('products_finished_product');
      case 'materia_prima':
        return t('products_raw_material');
      case 'material_empaque':
        return t('products_packaging_material');
      default:
        return type;
    }
  };

  const getProductStats = () => {
    const finished = products.filter(p => p.type === 'producto_terminado').length;
    const rawMaterials = products.filter(p => p.type === 'materia_prima').length;
    const packaging = products.filter(p => p.type === 'material_empaque').length;
    
    return { finished, rawMaterials, packaging };
  };

  const stats = getProductStats();

  return (
    <div className="p-4 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{t('products_title')}</h1>
          <p className="text-muted-foreground mt-1">
            {t('products_subtitle')}
          </p>
        </div>
        <Button onClick={handleAddProduct} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          {t('products_add_product')}
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('products_finished_products')}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.finished}</div>
            <p className="text-xs text-muted-foreground">
              Productos registrados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('products_raw_materials')}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.rawMaterials}</div>
            <p className="text-xs text-muted-foreground">
              Materias primas registradas
            </p>
          </CardContent>
        </Card>

        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {t('products_packaging_materials')}
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.packaging}</div>
            <p className="text-xs text-muted-foreground">
              Materiales de empaque
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('products_product_list')}</CardTitle>
          <CardDescription>
            {t('products_registered_products')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Descripción</TableHead>
                    <TableHead>Fecha Creación</TableHead>
                    <TableHead>Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell className="font-medium">{product.code}</TableCell>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getProductTypeLabel(product.type)}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.description}</TableCell>
                      <TableCell>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleDeleteProduct(product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              No hay productos registrados
            </div>
          )}
        </CardContent>
      </Card>

      {/* Product Form Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="bg-popover border border-border max-w-md mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">{t('products_add_new_product')}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="code">{t('products_product_code')}</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                placeholder="PT-001"
                required
              />
            </div>
            <div>
              <Label htmlFor="name">{t('products_product_name')}</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Paracetamol 500mg"
                required
              />
            </div>
            <div>
              <Label htmlFor="type">{t('products_product_type')}</Label>
              <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                <SelectTrigger>
                  <SelectValue placeholder={t('products_select_type')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="producto_terminado">{t('products_finished_product')}</SelectItem>
                  <SelectItem value="materia_prima">{t('products_raw_material')}</SelectItem>
                  <SelectItem value="material_empaque">{t('products_packaging_material')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">{t('products_description')}</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t('products_product_description')}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 justify-end">
              <Button type="button" variant="outline" onClick={handleClose} className="w-full sm:w-auto">
                {t('common_cancel')}
              </Button>
              <Button type="submit" className="w-full sm:w-auto">
                {t('products_add_product')}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductsModule;

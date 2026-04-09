import { ItemCard, ItemGroup, ItemGroupHeader, ItemGroupSection } from '@/components/item-card'
import { getAllMaterials, getAllProducts } from '@/server/repositories/items.repository'

export default async function ProdukList() {
    const products = await getAllProducts()
    const materials = await getAllMaterials()
    return (
        <ItemGroup>
            <ItemGroupSection>
                <ItemGroupHeader>Dijual</ItemGroupHeader>
                {products.data.map((item) => (
                    <ItemCard key={item.id} product={item} />
                ))}
            </ItemGroupSection>
            <ItemGroupSection>
                <ItemGroupHeader>Tidak Dijual</ItemGroupHeader>
                {materials.data.map((item) => (
                    <ItemCard key={item.id} product={item} />
                ))}
            </ItemGroupSection>
        </ItemGroup>
    )
}

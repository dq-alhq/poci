import { ItemCard, ItemGroup, ItemGroupHeader, ItemGroupSection } from '@/components/item-card'
import { getProducts } from '@/server/repositories/products.repository'

export default async function ProdukList() {
    const products = await getProducts()
    return (
        <ItemGroup>
            <ItemGroupSection>
                <ItemGroupHeader>Dijual</ItemGroupHeader>
                {products.map((item) => (
                    <ItemCard key={item.id} product={item} />
                ))}
            </ItemGroupSection>
        </ItemGroup>
    )
}

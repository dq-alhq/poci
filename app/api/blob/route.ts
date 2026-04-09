import { del, put } from '@vercel/blob'

export async function POST(request: Request) {
    const form = await request.formData()

    const file = form.get('file') as File

    const blob = await put(file.name, file, {
        access: 'public',
        addRandomSuffix: true
    })

    return Response.json(blob)
}

export async function DELETE(request: Request) {
    const blob = await request.json()
    await del(blob.url)
    return Response.json(blob)
}

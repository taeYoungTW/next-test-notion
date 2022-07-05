interface RevalidateGET {
    id?: string;
}
export const revalidateGET = async ({ id }: RevalidateGET) => {
    return await fetch(
        `api/revalidate?${new URLSearchParams({
            secret: process.env.NEXT_PUBLIC_REVALIDATE_KEY as string,
            ...(id && { id: id as string }),
        })}`
    );
};

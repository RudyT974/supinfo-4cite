const hList = [
    {
        name: 'monstera',
        category: 'classique',
        id: '1ed',
        isBestSale: true
    },
    {
        name: 'ficus lyrata',
        category: 'classique',
        id: '2ed',
        isBestSale: false
    },
    {
        name: 'pothos argenté',
        category: 'classique',
        id: '3ed',
        isBestSale: true
    },
    {
        name: 'yucca',
        category: 'classique',
        id: '4ed',
        isBestSale: true
    },{
        name: 'palmier',
        category: 'classique',
        id: '5ed',
        isBestSale: false
    }
]
function HotelList() {
    return (
        <ul>
            {
                hList.map((hotel) => (
                    <li key={ hotel.id }>
                        {hotel.isBestSale ? <span>{hotel.name}🔥</span> : <span>{hotel.name}</span>}
                    </li>
                ))}
        </ul>
    )
}

export default HotelList
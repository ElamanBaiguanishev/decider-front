import { FC } from 'react'
import { IDecider, IMap } from '../types/types'
import { instance } from '../api/axios.api'


export const deciderLoader = async () => {
    const maps = await instance.get<IMap[]>('/maps')

    const data = {
        maps: maps.data
    }

    return data
}

export const deciderAction = async ({ request }: any) => {
    switch (request.method) {
        case 'POST': {
            console.log('ПОСТ СРАБОТАЛ')
            const formData = await request.formData()
            const json: IMap[] = JSON.parse(formData.get('maps'))
            const newDecider: IDecider = {
                title: formData.get('title'),
                description: formData.get('description'),
                maps: json.map(map => map.id)
            }
            await instance.post('/deciders', newDecider)
            return null
        }
        case 'DELETE': {
            return null
        }
    }
}

const Decider: FC = () => {
    return <div>Decider</div>
}

export default Decider
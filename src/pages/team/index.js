import { useEffect } from 'react'
import AdminLayout from '@/src/content/AdminLayout'
import { useAppContext } from '@/src/context/app'
import { useRouter } from 'next/router'
import { useTournamentContext } from '@/src/context/TournamentContext'
import { useAuthContext } from '@/src/context/AuthContext'
import TeamTable from '@/src/pages/components/TeamTable'

const Page = (props) => {
    const router = useRouter();
    const { user } = useAuthContext();
    const { setTitle } = useAppContext();
    const { team } = useTournamentContext();

    const handle = {
        show: (id) => {
            router.push('/team/' + id);
        }
    }

    useEffect(() => {
        setTitle('TEAMS')
    }, [])

    return (
        <TeamTable teams={team.teams} uid={user.id} handle={handle.show} />
    )
}

Page.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Page;

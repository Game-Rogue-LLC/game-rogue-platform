import { useEffect } from 'react'
import AdminLayout from '@/src/content/AdminLayout'
import { useAppContext } from '@/src/context/app'
import { Router, useRouter } from 'next/router'
import { useEventContext } from '@/src/context/EventContext'
import { useOrganizationContext } from '@/src/context/OrganizationContext'
import { useMatchContext } from '@/src/context/MatchContext'
import dayjs from 'dayjs';
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
        <TeamTable teams={team.teams} uid={user.id} />
    )
}

Page.getLayout = (page) => {
    return <AdminLayout>{page}</AdminLayout>
}

export default Page;

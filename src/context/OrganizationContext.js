import { useRouter } from 'next/router';
import { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import organizationStore from '@/lib/firestore/collections/organization';
import nProgress from 'nprogress';
import Splash from '@/src/content/Splash';
import { useAuthContext } from './AuthContext';

const OrganizationContext = createContext({});

export const useOrganizationContext = () => useContext(OrganizationContext)

export default (props) => {
    const { user } = useAuthContext()
    const router = useRouter();
    const [organizations, setOrganizations] = useState({});
    const [current, setCurrent] = useState(null)
    const [loading, setLoading] = useState(true)
    const [activeCount, setActiveCount] = useState(0);

    const setOrganization = async (data, active) => {
        await setOrganizations(data);
        setActiveCount(active)
    }

    const organization = {
        readOrganization: async () => {
            setLoading(true)
            await organizationStore.read(user?.id, setOrganization, () => setLoading(false))
        },
        saveOrganization: async (data, id) => {
            return await organizationStore.save(data, id)
        },
        addOrganization: async (organization) => {
            organization = {
                ...organization,
                uid: user?.id,
                deleted: false
            }
            return await organizationStore.save(organization, null)
        },
        updateOrganization: async (id, newOrg) => {
            return await organizationStore.save(newOrg, id)
        },
        deleteOrganization: async (id) => {
            organizationStore.save({ deleted: true }, id)
            router.push('/organization/create')
        },
        uploadContentImage: organizationStore.uploadFile
    }

    useEffect(() => {
        organization.readOrganization()
    }, [])

    // useEffect(() => {
    //     if (loading == false) {
    //         if (user && Object.keys(organizations).length == 0)
    //             router.push('/organization/create')
    //     }
    // }, [organizations, loading])

    return (
        <OrganizationContext.Provider value={{
            organizations, ...organization,
            current, setCurrent,
            activeCount, loading
        }}>
            {props.children}
        </OrganizationContext.Provider>
    )
}

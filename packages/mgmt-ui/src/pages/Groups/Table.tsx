import {openConfirmModal}                                 from "@mantine/modals";
import * as React                                         from 'react';
import {Table as MantineTable, Group, Text, ActionIcon, ScrollArea, Menu} from '@mantine/core';
import {
    IconDots,
    IconTrash, IconUsers,
}                                                         from '@tabler/icons';
import {PlaceholderBanner}                                from "../../components/banners/PlaceholderBanner/PlaceholderBanner";

/**
 * Item
 */
export type Item = { groupId: string, name: string; description: string }

/**
 * TableProps
 */
export interface TableProps {
    loading: boolean
    items: Item[];

    onClick: (item: Item) => void
    onDeleteGroup: (item: Item) => void
}

/**
 * Table
 * @param props
 * @constructor
 */
export function Table(props: TableProps) {
    if(props.items.length === 0){
        return <PlaceholderBanner loading={props.loading} icon="groups"/>
    }

    const openDeleteModal = (group: Item) => openConfirmModal({
        title: `Delete "${group.name}"?`,
        centered: true,
        children: (
            <Text size="sm">
                Are you sure you want to delete this group? This action is destructive and you will have
                to contact support to restore your data.
            </Text>
        ),
        labels: { confirm: 'Delete group', cancel: "No don't delete it" },
        confirmProps: { color: 'red' },
        onConfirm: () => props.onDeleteGroup(group),
    });

    const rows = props.items.map((row) => (
        <tr key={row.groupId}>
            <td><Text size={14}>{row.name}</Text></td>
            <td><Text size={14}>{row.description}</Text></td>
            <td>
                <Group noWrap spacing={0} position="right">
                    <ActionIcon color="blue" onClick={() => props.onClick(row)} variant="subtle">
                        <IconUsers
                            size={16}
                            stroke={1.5}
                        />
                    </ActionIcon>

                    <Menu transition="pop" withArrow position="bottom-end">
                        <Menu.Target>
                            <ActionIcon>
                                <IconDots size={16} stroke={1.5} />
                            </ActionIcon>
                        </Menu.Target>
                        <Menu.Dropdown>
                            <Menu.Item onClick={() => openDeleteModal(row)} icon={<IconTrash size={16} stroke={1.5} />} color="red">
                                Delete
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                </Group>
            </td>
        </tr>
    ));

    return (
        <ScrollArea.Autosize maxHeight={300}>
            <MantineTable verticalSpacing={20} sx={{ minWidth: 700 }}>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </MantineTable>
        </ScrollArea.Autosize>
    );
}
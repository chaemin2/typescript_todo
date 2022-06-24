import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

function App() {
	const ondragEnd = () => {};
	return (
		<DragDropContext onDragEnd={ondragEnd}>
			<div>
				<Droppable droppableId="one">
					{magic => (
						<ul ref={magic.innerRef} {...magic.droppableProps}>
							<Draggable draggableId="first" index={0}>
								{() => <li>One</li>}
							</Draggable>
							<Draggable draggableId="second" index={1}>
								{() => <li>Two</li>}
							</Draggable>
						</ul>
					)}
				</Droppable>
			</div>
		</DragDropContext>
	);
}

export default App;

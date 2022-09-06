const initLabelsFilter = (labels) => {
    const state = {noLabels: false}
    labels.map((label) => state[label._id] = false);
    return state;
}

export default initLabelsFilter;
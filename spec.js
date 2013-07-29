describe('localStorage', function () {

    var counter;

    it('counter (fails after reinstall)', function () {
        counter = localStorage.getItem('counter');
        expect(counter).toBeGreaterThan(0);
        if (!counter) {
            counter = 0;
        }
    });

    it('supports setItem and getItem methods', function () {
        localStorage.setItem('test', '1');
        expect(localStorage['test']).toBe('1');
        expect(localStorage.getItem('test')).toBe('1');
    });

    it('supports clear method', function () {
        localStorage.setItem('test', '1');
        expect(localStorage['test']).toBe('1');
        localStorage.clear();
        expect(localStorage['test']).toBeUndefined();
    });

    it('supports remove method', function () {
        localStorage.setItem('test', '1');
        expect(localStorage['test']).toBe('1');
        localStorage.removeItem('test');
        expect(localStorage['test']).toBeUndefined();

        counter++;
        localStorage.setItem('counter', counter);
    });


});
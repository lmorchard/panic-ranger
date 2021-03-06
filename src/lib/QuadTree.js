/**
 * @author       Timo Hausmann
 * @author       Richard Davey <rich@photonstorm.com>
 * @copyright    2014 Photon Storm Ltd.
 * @license      {@link https://github.com/photonstorm/phaser/blob/master/license.txt|MIT License}
 */

/**
 * A QuadTree implementation. The original code was a conversion of the Java code posted to GameDevTuts.
 * However I've tweaked it massively to add node indexing, removed lots of temp. var creation and significantly increased performance as a result.
 * Original version at https://github.com/timohausmann/quadtree-js/
 *
 * @class QuadTree
 * @constructor
 * @param {number} x - The top left coordinate of the quadtree.
 * @param {number} y - The top left coordinate of the quadtree.
 * @param {number} width - The width of the quadtree in pixels.
 * @param {number} height - The height of the quadtree in pixels.
 * @param {number} [maxObjects=10] - The maximum number of objects per node.
 * @param {number} [maxLevels=4] - The maximum number of levels to iterate to.
 * @param {number} [level=0] - Which level is this?
 */
export default function QuadTree(left, top, width, height, maxObjects, maxLevels, level, root) {

  /**
   * @property {number} maxObjects - The maximum number of objects per node.
   * @default
   */
  this.maxObjects = 10;

  /**
   * @property {number} maxLevels - The maximum number of levels to break down to.
   * @default
   */
  this.maxLevels = 4;

  /**
   * @property {number} level - The current level.
   */
  this.level = 0;

  /**
   * @property {object} bounds - Object that contains the quadtree bounds.
   */
  this.bounds = {};

  /**
   * @property {array} objects - Array of quadtree children.
   */
  this.objects = [];

  /**
   * @property {array} nodes - Array of associated child nodes.
   */
  this.nodes = [];

  /**
   * @property {array} _empty - Internal empty array.
   * @private
   */
  this._empty = [];

  this.root = root || this;
  this.entityMap = {};

  this.reset(left, top, width, height, maxObjects, maxLevels, level);

};

QuadTree.prototype = {

  /**
   * Resets the QuadTree.
   *
   * @method QuadTree#reset
   * @param {number} x - The top left coordinate of the quadtree.
   * @param {number} y - The top left coordinate of the quadtree.
   * @param {number} width - The width of the quadtree in pixels.
   * @param {number} height - The height of the quadtree in pixels.
   * @param {number} [maxObjects=10] - The maximum number of objects per node.
   * @param {number} [maxLevels=4] - The maximum number of levels to iterate to.
   * @param {number} [level=0] - Which level is this?
   */
  reset: function (left, top, width, height, maxObjects, maxLevels, level) {

    this.maxObjects = maxObjects || 10;
    this.maxLevels = maxLevels || 4;
    this.level = level || 0;

    this.bounds = {
      width: width,
      height: height,
      subWidth: Math.floor(width / 2),
      subHeight: Math.floor(height / 2),
      left: Math.round(left),
      top: Math.round(top),
      midX: Math.round(left + width / 2),
      midY: Math.round(top + height / 2),
      right: Math.round(left + width),
      bottom: Math.round(top + height)
    };

    this.objects.length = 0;
    this.nodes.length = 0;

  },

  /**
   * Split the node into 4 subnodes
   *
   * @method QuadTree#split
   */
  split: function () {

    //  top right node
    this.nodes[0] = new QuadTree(
      this.bounds.left + this.bounds.subWidth,
      this.bounds.top,
      this.bounds.subWidth, this.bounds.subHeight,
      this.maxObjects, this.maxLevels, (this.level + 1), this.root
    );

    //  top left node
    this.nodes[1] = new QuadTree(
      this.bounds.left,
      this.bounds.top,
      this.bounds.subWidth, this.bounds.subHeight,
      this.maxObjects, this.maxLevels, (this.level + 1), this.root
    );

    //  bottom left node
    this.nodes[2] = new QuadTree(
      this.bounds.left,
      this.bounds.top + this.bounds.subHeight,
      this.bounds.subWidth, this.bounds.subHeight,
      this.maxObjects, this.maxLevels, (this.level + 1), this.root
    );

    //  bottom right node
    this.nodes[3] = new QuadTree(
      this.bounds.left + this.bounds.subWidth,
      this.bounds.top + this.bounds.subHeight,
      this.bounds.subWidth, this.bounds.subHeight,
      this.maxObjects, this.maxLevels, (this.level + 1), this.root
    );

  },

  /**
   * Insert the object into the node. If the node exceeds the capacity, it will split and add all objects to their corresponding subnodes.
   *
   * @method QuadTree#insert
   * @param {Phaser.Physics.Arcade.Body|object} body - The Body object to insert into the quadtree. Can be any object so long as it exposes x, y, right and bottom properties.
   */
  insert: function (body) {

    var i = 0;
    var index;

    //  if we have subnodes ...
    if (this.nodes[0] != null) {
      index = this.getIndex(body);
      if (index !== -1) {
        this.nodes[index].insert(body);
        return;
      }
    }

    // Check if we already have this item in the quadtree structure.
    var oldNode = this.root.entityMap[body.entityId];
    if (oldNode === this) {
      // If we have the item, and it's this current sub-tree, then just bail.
      return;
    }
    if (oldNode) {
      // If the item is known, but in another sub-tree, then delete it from there.
      var objectIndex = oldNode.objects.indexOf(body);
      if (objectIndex !== -1) {
        oldNode.objects.splice(objectIndex, 1);
      }
    }

    /*
    // TODO: Need the opposite of split() to consolidate subtrees when they
    // lose items.

    this.root.entityMap[body.entityId] = this;
    */

    this.objects.push(body);

    if (this.objects.length > this.maxObjects && this.level < this.maxLevels) {
      //  Split if we don't already have subnodes
      if (this.nodes[0] == null) {
        this.split();
      }
      //  Add objects to subnodes
      while (i < this.objects.length) {
        index = this.getIndex(this.objects[i]);
        if (index !== -1) {
          //  this is expensive - see what we can do about it
          this.nodes[index].insert(this.objects.splice(i, 1)[0]);
        } else {
          i++;
        }
      }
    }

  },

  /**
   * Determine which node the object belongs to.
   *
   * @method QuadTree#getIndex
   * @param {Phaser.Rectangle|object} rect - The bounds in which to check.
   * @return {number} index - Index of the subnode (0-3), or -1 if rect cannot completely fit within a subnode and is part of the parent node.
   */
  getIndex: function (rect) {
    if (rect.left < this.bounds.midX && rect.right < this.bounds.midX) {
      if (rect.top < this.bounds.midY && rect.bottom < this.bounds.midY) {
        //  rect fits within the top-left quadrant of this quadtree
        return 1;
      } else if (rect.top > this.bounds.midY) {
        //  rect fits within the bottom-left quadrant of this quadtree
        return 2;
      }
    } else if (rect.left > this.bounds.midX) {
      //  rect can completely fit within the right quadrants
      if (rect.top < this.bounds.midY && rect.bottom < this.bounds.midY) {
        //  rect fits within the top-right quadrant of this quadtree
        return 0;
      } else if (rect.top > this.bounds.midY) {
        //  rect fits within the bottom-right quadrant of this quadtree
        return 3;
      }
    }
    // rect doesn't fit, i.e. it straddles the internal quadrants
    return -1;
  },

  /**
   * Iterate through all objects that could collide with the given Sprite or Rectangle.
   *
   * @method QuadTree#retrieve
   * @param {Phaser.Sprite|Phaser.Rectangle} source - The source object to check the QuadTree against. Either a Sprite or Rectangle.
   */
  iterate: function (source, iteratorFn, optionalParam) {
    var index = this.getIndex(source);

    for (var i = 0; i < this.objects.length; i++) {
      iteratorFn(this.objects[i], optionalParam);
    }

    if (this.nodes[0]) {
      //  If rect fits into a subnode ..
      if (index !== -1) {
        this.nodes[index].iterate(source, iteratorFn, optionalParam);
      } else {
        //  If rect does not fit into a subnode, check it against all subnodes (unrolled for speed)
        this.nodes[0].iterate(source, iteratorFn, optionalParam);
        this.nodes[1].iterate(source, iteratorFn, optionalParam);
        this.nodes[2].iterate(source, iteratorFn, optionalParam);
        this.nodes[3].iterate(source, iteratorFn, optionalParam);
      }
    }
  },

  /**
   * Clear the quadtree.
   * @method QuadTree#clear
   */
  clear: function () {
    this.objects.length = 0;
    var i = this.nodes.length;
    while (i--) {
      this.nodes[i].clear();
      this.nodes.splice(i, 1);
    }
    this.nodes.length = 0;
  }

};

/**
 * Javascript QuadTree
 * @version 1.0
 *
 * @version 1.3, March 11th 2014
 * @author Richard Davey
 * The original code was a conversion of the Java code posted to GameDevTuts. However I've tweaked
 * it massively to add node indexing, removed lots of temp. var creation and significantly
 * increased performance as a result.
 *
 * Original version at https://github.com/timohausmann/quadtree-js/
 */

/**
 * @copyright © 2012 Timo Hausmann
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
